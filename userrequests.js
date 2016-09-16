import util from 'util';
import { runQuery } from './sqlQuery';
import { http500, http200, sendJSON } from './httphelpers';

export function getUser(request, response, userName) {
    runQuery(`SELECT * FROM users WHERE username=${userName}`, function (data, error) {
        if (error) {
            http500(request, response, error);
        } else {
            sendJSON(request, response, data);
        }
    });
};

export function addUser(request, response, requestBody) {
    try {
        if (!requestBody) throw new Error('The user could not be added.');
        const data = JSON.parse(requestBody);
        if (data) {
            let sqlData = 'INSERT INTO users (username, email, password) VALUES';
            sqlData += util.format('("%s", "%s", "%s")', data.username, data.email, data.password);
            runQuery(sqlData, function (data, error) {
                if (error) {
                    http500(request, response, error);
                } else {
                    http200(request, response);
                }
            });
        }
    } catch (error) {
        http500(request, response, error);
    }
}
