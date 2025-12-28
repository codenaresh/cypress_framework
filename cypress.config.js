const { defineConfig } = require("cypress")
const fs = require("fs-extra")
const mysql = require("mysql2/promise")
const path = require("path")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/auth",

    setupNodeEvents(on, config) {

      // 🔹 Clean old reports
      on("before:run", async () => {
        fs.removeSync("cypress/reports")

        // 🔹 AUTO DB SETUP (runs once per test run)
        const connection = mysql.createPool({
          host: config.env.DB_HOST || "localhost",
          user: config.env.DB_USER || "root",
          password: config.env.DB_PASSWORD || "root123",
          database: config.env.DB_NAME || "employee",
        })

        const [rows] = await connection.execute(
          "SELECT id, salary, department FROM employee"
        )

        await connection.end()

        const fixturePath = path.join(
          __dirname,
          "cypress/fixtures/employees.json"
        )

        fs.writeJsonSync(fixturePath, rows, { spaces: 2 })
      })

      // 🔹 Mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on)

      // 🔹 Optional DB task (for validations)
      on("task", {
        async queryDb({ query, values }) {
          const connection = mysql.createPool({
            host: config.env.DB_HOST || "localhost",
            user: config.env.DB_USER || "root",
            password: config.env.DB_PASSWORD || "root123",
            database: config.env.DB_NAME || "employee",
          })

          const [rows] = await connection.execute(query, values)
          await connection.end()
          return rows
        }
      })

      return config
    },

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: `cypress/reports/${Date.now()}`,
      charts: true,
      reportPageTitle: "OrangeHRM Automation Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    specPattern: "cypress/e2e/**/*.cy.js",

    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
})

