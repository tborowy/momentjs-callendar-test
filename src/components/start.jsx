import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {TextField, SelectField} from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';


class Start extends Component {

    renderOption(text, val) {
        return <MenuItem key={val} value={val} primaryText={text}/>;
    }

    renderCalendarHeader(date) {
        const arr = [];
        let i = 0;
        arr.push(<th key="wk">Wk/Dw</th>);
        for (i; i < 7; i++) {
            arr.push(<th key={i}>{date._locale._weekdaysShort[(i + date._locale._week.dow) % 7]}</th>);
        }
        return <tr>{arr}</tr>;
    }

    renderCalendarBody(date) {
        const actualDate = moment(date);
        const calendar = [];
        let rowIndex = 0;
        while (0 === actualDate.get('month')) {
            calendar.push(this.renderCalendarRow(actualDate.startOf('week').valueOf()));
            actualDate.add(1, 'week');
            rowIndex++;
        }
        return calendar;
    }

    renderCalendarRow(startDate) {
        const date = moment(startDate);
        return <tr key={startDate}>
            <td>{date.week()}</td>
            <td>{date.format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
            <td>{date.add(1, 'day').format('D')}</td>
        </tr>;
    }

    renderNextYear(date) {
        return <div className="col-xs-4">
            {date.add(1, 'year').format('YYYY')}
            <table style={{width: 300}}>
                <thead>
                {this.renderCalendarHeader(date)}
                </thead>
                <tbody>
                {this.renderCalendarBody(date)}
                </tbody>
            </table>
        </div>;
    }

    checkNextYears(isAlternative, counter) {
        const arrayOfSettings = [
            {
                dow: 0,
                doy: isAlternative ? 13 : 6
            },
            {
                dow: 1,
                doy: isAlternative ? 14 : 7
            },
            {
                dow: 2,
                doy: isAlternative ? 15 : 8
            },
            {
                dow: 3,
                doy: isAlternative ? 16 : 9
            },
            {
                dow: 4,
                doy: isAlternative ? 17 : 10
            },
            {
                dow: 5,
                doy: isAlternative ? 18 : 11
            },
            {
                dow: 6,
                doy: isAlternative ? 19 : 12
            }
        ];
        console.clear();
        _.map(arrayOfSettings, (config) => {
            moment.updateLocale('en', {
                week: config
            });
            let actualYear = 1900;
            const actualDate = moment().set({
                year: actualYear,
                month: 0,
                date: 1
            });
            const weekNumber = isAlternative ? 2 : 1;
            while (2501 > actualYear) {
                counter.i++;
                actualDate.set('year', actualYear);
                if (weekNumber !== actualDate.week()) {
                    console.log(actualDate.format('W - YYYY'), config, isAlternative);
                }
                actualYear++;
            }
        });
    }

    render() {
        moment.updateLocale('en', {
            week: {
                dow: Number(_.get(this, 'props.formValue.dow')),
                doy: Number(_.get(this, 'props.formValue.doy'))
            }
        });
        const date = moment().set({year: 2016, month: 0, date: 1});
        return (<div>
            <div className="row">
                <div className="col-xs-8">
                    <div className="col-xs-4">
                        <Field
                            name="dow"
                            component={SelectField}>
                            {_.map({
                                1: 'Monday',
                                2: 'Tuesday',
                                3: 'Wednesday',
                                4: 'Thursday',
                                5: 'Friday',
                                6: 'Saturday',
                                0: 'Sunday'
                            }, this.renderOption)}
                        </Field>
                    </div>
                    <div className="col-xs-4">
                        <Field name="doy" type="number" component={TextField}/>
                    </div>
                </div>
                <div className="col-xs-4">
                    dow: {date._locale._week.dow}<br/>
                    doy: {date._locale._week.doy}<br/>
                </div>
            </div>
            <div className="row">
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
                <div className="clearfix"/>
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
                <div className="clearfix"/>
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
                {this.renderNextYear(date)}
            </div>
            <a onClick={() => {
                const counter = {
                    i: 0
                };
                this.checkNextYears(false, counter);
                this.checkNextYears(true, counter);
                console.log(counter.i, 'DONE!');
            }}>Check next Years</a>
        </div>);
    }
}

const Form = reduxForm({
    form: 'momentSettings'
})(Start);

function mapStateToProps(state) {
    return {
        formValue: _.get(state, 'form.momentSettings.values'),
        initialValues: {
            dow: 1,
            doy: 1
        }
    }
}

export default connect(mapStateToProps)(Form);
