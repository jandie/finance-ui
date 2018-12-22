import React from 'react'
import moxios from 'moxios';
import Root from "../Root";
import sinon from "sinon";
import {expect} from 'chai'
import {createMount} from '@material-ui/core/test-utils';
import Login from '../components/auth/Login';

let subject;
let initialState;
let mount;

beforeEach(() => {
    mount = createMount();
    moxios.install();
});

afterEach(() => {
    mount.cleanUp();
    moxios.uninstall();
});

it('checks if login works correctly', (done) => {
    moxios.stubRequest(/.*/, {
        status: 200,
        response: {
            token: 'testtokenlogin'
        }
    });
    const history = {
        push: sinon.spy()
    };
    subject = mount(<Root><Login history={history}/></Root>);

    subject.find('TextField').at(0).find('input').simulate('change', {
        target: {value: 'username'}
    });
    subject.find('TextField').at(1).find('input').simulate('change', {
        target: {value: 'password'}
    });
    subject.update();

    subject.find('Button').simulate('submit');
    subject.update();

    moxios.wait(() => {
        subject.update();

        expect(history.push.callCount).to.equal(1);

        done();
    });
});