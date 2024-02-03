const { query } = require('express');
const { Pool } = require('pg');

class DatabaseService {
    connection = {
        user: 'maxim_dev',
        password: 'changeme',
        host: 'postgres',
        database: 'maxim_dev',
        port: 5432
    };

    pool;

    constructor() {
        this.pool = new Pool(this.connection);
    }

    async connect() {
        try {
            await this.pool.connect();
            console.log("[server]: Connected to the database")
        } catch (err) {
            throw new Error();
        }
    }

    close() {
        try {
            this.pool.end();
            console.log("[server]: Database connection closed.");
            process.exit(0);

        } catch (err) {
            throw new Error();
        }
    }

    // ====================================================================================================
    // User
    // ====================================================================================================

    async getAllUsers() {
        try {
            const result = await this.pool.query("SELECT * FROM UserAccount");
            return result.rows;
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server sql error');
        }
    }

    async getSingleUser(userId) {
        try {
            const result = await this.pool.query("SELECT * FROM UserAccount WHERE UserId = $1", [userId]);
            return result.rows.length === 0 ? null : result.rows[0];
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server sql error');
        }
    }

    async getSingleUserByEmail(email) {
        try {
            const result = await this.pool.query("SELECT * FROM UserAccount WHERE useremail = $1", [email]);
            return result.rows.length === 0 ? null : result.rows[0];
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server sql error');
        }
    }

    async addNewUser(attributes) {
        try {
            const result = await this.pool.query(
                'INSERT INTO UserAccount (UserEmail, AuthToken) VALUES ($1, $2) RETURNING *',
                [attributes.user_email, attributes.auth_token]
            );
            return result.rows[0];
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server error');
        }
    }

    async updateUserInfo(userId, updatedUserData) {
        try {
            const user_table_map = {
                "userEmail": "useremail",
                "authToken": "authtoken"
            }

            // Build dynamic set
            const setClause = Object.keys(updatedUserData)
                .map((key, index) => `${user_table_map[key]} = $${index + 2}`)
                .join(', ');

            // Construct dynamic sql query
            const queryString = `UPDATE UserAccount SET ${setClause} WHERE UserId = $1 RETURNING *`;

            // Execute query
            const result = await this.pool.query(queryString, [userId, ...Object.values(updatedUserData)]);
            return result.rows[0];
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server error');
        }
    }

    async userExists(userId) {
        try {
            const result = await this.pool.query("SELECT * FROM UserAccount WHERE UserId = $1", [userId]);
            return result.rows.length !== 0;
        } catch (err) {
            console.error('[server]: Error getting user details. SQL query error: ', err);
            throw new Error('Internal server error');
        }
    }

    async getGoogleAuthToken(userId) {
        try {
            const queryString = "SELECT authtoken FROM UserAccount WHERE userId = $1";
            const result = await this.pool.query(queryString, [userId]);
            return result.rows.length === 0 ? null : result.rows[0].authtoken;
        } catch (err) {
            console.error('[server]: Error setting authtoken. SQL query error: ', err);
            throw new Error('Internal server sql error');
        }
    }

    async setGoogleAuthToken(userId, token) {
        try {
            const queryString = "UPDATE UserAccount SET AuthToken = $2 WHERE UserId = $1";
            await this.pool.query(queryString, [userId, token]);
        } catch (err) {
            console.error('[server]: Error setting authtoken. SQL query error: ', err);
            throw new Error('Internal server sql error');
        }
    }


}

module.exports = DatabaseService;
