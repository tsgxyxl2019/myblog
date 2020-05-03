/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');
const BIGQUERY = require('@google-cloud/bigquery');


// Enter your calendar ID below and service account JSON below
const calendarId = "1uij0f02h3qc7782hvrtjdb4ls@group.calendar.google.com";
const serviceAccount = {
 "type": "service_account",
 "project_id": "velo-testchatbot-jeetih",
 "private_key_id": "c573143a25ad1ee7a2ffbf693976d36003aee729",
 "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDfIBCqV7efDqGg\njHJ4G7SaMWo9LavgN9v1ozFY0TYuc0/W+kGG/D3KeWv8GPfr2Pcj8y0UH0SbMqW2\nNECuey1IJ7n2QxGR4/6oYRpAgNz8LfY9NrHQJfhUgh+wLI4qr14vxI/wMUQ2MlFz\n4HcgpAdyHvBJ6S5CKwaxaMFYgfxrpOiRWaC4TZyiDIZindOpOrt5YDEnSbMqtpip\nGI3OFvjwXuCuzZrXYIcvHL25l/6E8NckZpXWBuIKdY+uYoPtlcHpX1omGsa2wvIu\nmxgQ0NaUNFK3suGPS4LbUUqF2ktoL9m+5CYKGkpd59WPYyOp4QiugcCAm++RESQc\nQ5J9esbrAgMBAAECggEAITcIxBLixs7KyLeformdHQcWJZ1S5MHsAJkWk34xbqDD\n1eDTOGD8YdPJe3HMFlPqFnPw1foBoIjdmk4VAuRbTU58pGg/iVRDaJVr7wY/31qI\nOXyW48GDQjFMvlEjqL8Kaln8g2kSGm9LKNDVawqAAUERzC7mL/tvt6E8hwxyoyNW\nK3uBfgPJixDtDSNcsrU6iUf1frQMNXdirDKAE9WNRVqendUaPqhRdQfNCsozZJck\nzmuJvIych095B7nyMlg0Oqmwm3Sxzr5ddoU3h8UDs6IkKmVk7jhTNF6EdJG6I4q/\nnPO1fAoPUiLREVlOQ7NEwSXIMSO/NFO+N1Q+WNIzYQKBgQD7mhBRhoas7QnOVtPl\nhoXpoEZuLWxFULxsd0v3TujAHMWmsPGTLK956c5MdWdcnicDaHakw7Pbj/WsT7SA\ntvMSu7kwkdrb0VSxHY1medGeI8rRr8WbI9hz/zJKu6xF+uzpqWgu3BdDb1Mqs7Dn\nMhz60XU1oiNvL3Wov1vblG5HRwKBgQDjBpETvyBFEgvY8xyyQOJx8+e6McTKs8g1\nII4GHTWKThdJGBtspUV2uKAnGIvJSytnem67A6xRofcCkHVIeubyRzWO8QBHK/XA\n4szhAZ+Chkz1u8oGnRAluR+2V0uMlVVUA8N8LAeOpDZUDRITZtOucWW5ZSMovKLe\nDPcZi7ldPQKBgQDLAL2V6eMT95Vn5OrHUMkPfYAWOZQYQVImegLTIdnt18kp+66O\nvwk+ZoVLb5bcRcbYmxrPSg/+YaMpSo4rJHHvdYOwSp65qaaZ2WxTeIrG+74Tfa0E\nxeFJhmh/n/kZ5aHtzf//fxlOEa6az602fVqgjQvzIEVS2oomg2+MNbDc1QKBgQDL\nqRBszoB8dfv6291aa6q43z16YztPPIjWYCYIhhuJvxRUljPD+1+daXMCn5qHMc/2\nPHcpfdoQQWP+AOm148tafVcmrDy7nEwShWOWVoZp6WEQ8S4DUNMzhCdWxGkZ7L1n\naRjtQ/JjnBzAuhkFHrG3RDMlZf1shgz1dlwVpqrbYQKBgQDzHC1DnHGsht0SVx8h\n1iTyfma4OLonjCS6tyr1stFBrOHQOgsjqfxasbeqWaLAsrAnVpl+X4PNWXFkjSdI\noncYu0yvwFHZWJWXfHDlEUA+8+6x5JAjCJIQ3yu5fY5NdgewY/RnTmyPI7Q+PLLo\n7UkwIdnClhzbf4WVnTa6lqPLeQ==\n-----END PRIVATE KEY-----\n",
 "client_email": "appointment-schedule@velo-testchatbot-jeetih.iam.gserviceaccount.com",
 "client_id": "104451426144737866779",
 "auth_uri": "https://accounts.google.com/o/oauth2/auth",
 "token_uri": "https://oauth2.googleapis.com/token",
 "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
 "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/appointment-schedule%40velo-testchatbot-jeetih.iam.gserviceaccount.com"
}; // Starts with {"type": "service_account",...

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'Australia/Sydney';
const timeZoneOffset = '+10:00';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log("Parameters", agent.parameters);
  
  const client_contact = agent.parameters.client_contact;
  
  function makeAppointment (agent) {
    // Calculate appointment start and end datetimes (end = +1hr from start)
    console.log("Parameters", agent.parameters.date);
    const appointment_type = agent.parameters.job;
    const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('+')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );

    // Check the availibility of the time, and make an appointment if there is time on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type, client_contact).then(() => {
      agent.add(`恭喜你,成功预约${appointmentTimeString}的面试！请尽快向我们公司邮箱发送您的resume和意向的工作岗位, 我们的工作人员会尽快与您取得联系.See you soon~.`);
      addToBigQuery_appointment(agent, appointment_type,client_contact);
    }).catch(() => {
      agent.add(`非常抱歉, 由于您预约的时段面试人数过多,${appointmentTimeString} 无法预约, 请挑选其他工作时间进行预约, 或者直接和我们工作人员联系, 工作人员微信号： XXXXXX, 期待你的理解.`);
    });
  }


  function bookCourse (agent) {
    const course_Type =  agent.parameters.course;
    addToBigQuery_bookcourse(agent, course_Type,client_contact);
  }

  let intentMap = new Map();
  intentMap.set('Schedule Appointment', makeAppointment);
  intentMap.set('Book_Course', bookCourse);
  
  agent.handleRequest(intentMap);
});

function addToBigQuery_appointment(agent, appointment_type, client_contact) {
  const date_bq = agent.parameters.date.split('T')[0];
  const time_bq = agent.parameters.time.split('T')[1].split('+')[0];
  // const client_contact_bq = agent.parameters.client_contact;
  // const appointment_type_bq = agent.parameters.job;
  /**
  * TODO(developer): Uncomment the following lines before running the sample.
  */
  const projectId = 'velo-testchatbot-jeetih'; 
  const datasetId = "velo_chatbot";
  const tableId = "appointment_schedule";
  const bigquery = new BIGQUERY({
    projectId: projectId
  });
 const rows = [{job: appointment_type, date: date_bq,contact: client_contact, time: time_bq }];

 bigquery
.dataset(datasetId)
.table(tableId)
.insert(rows)
.then(() => {
  console.log(`Inserted ${rows.length} rows`);
})
.catch(err => {
  if (err && err.name === 'PartialFailureError') {
    if (err.errors && err.errors.length > 0) {
      console.log('Insert errors:');
      err.errors.forEach(err => console.error(err));
    }
  } else {
    console.error('ERROR:', err);
  }
});
agent.add(`Added ${date_bq} and ${time_bq} into the table`);
}

function addToBigQuery_bookcourse(agent, course_Type,client_contact) {
  var myDate = new Date();
  const date_bq = myDate.toLocaleString();
  const projectId = 'velo-testchatbot-jeetih'; 
  const datasetId = "velo_chatbot";
  const tableId = "book_course";

  const bigquery = new BIGQUERY({
    projectId: projectId
  });
 const rows = [{course: course_Type,contact: client_contact, date: date_bq, }];

 bigquery
.dataset(datasetId)
.table(tableId)
.insert(rows)
.then(() => {
  console.log(`Inserted ${rows.length} rows`);
})
.catch(err => {
  if (err && err.name === 'PartialFailureError') {
    if (err.errors && err.errors.length > 0) {
      console.log('Insert errors:');
      err.errors.forEach(err => console.error(err));
    }
  } else {
    console.error('ERROR:', err);
  }
});
agent.add(`恭喜您申请课程成功, 我们的老师会尽快与您取得联系，并提供最优质的课程咨询和介绍，更有神秘大礼等着您。`);
}


function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type, client_contact) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: appointment_type +' Appointment client_contact: ' + client_contact, description: appointment_type,
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}



