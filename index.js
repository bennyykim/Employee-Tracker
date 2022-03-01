const inquirer = require('inquirer');
const db = require('./db/connection');

function viewDepartments() {
    db.promise().query('SELECT * FROM department;')
        .then(([results, fields]) => {
            console.table(results)
        }).then(() => {
            init();
        })
};

function viewRoles() {
    db.promise().query('SELECT * FROM role;')
        .then(([results, fields]) => {
            console.table(results)
        }).then(() => {
            init();
        })
};

function viewEmployees() {
    db.promise().query('SELECT * FROM employee;')
        .then(([results, fields]) => {
            console.table(results)
        }).then(() => {
            init();
        })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((res) => {
        db.promise().query("INSERT INTO department (name) VALUES (?)", res.name)
    })
        .then(() => {
            init();
        })
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id?'
        }
    ]).then((res) => {
        console.log(res);
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?)`, (res.title, res.salary, res.department_id))
    })
        .then(() => {
            init();
        })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager id?'
        }
    ]).then((res) => {
        console.log(res);
        db.promise().query(`INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (?)`, (res.first_name, res.last_name, res.role_id, res.manager_id))
    })
        .then(() => {
            init();
        })
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Which employee do you want to update?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role id?'
        }
    ]).then((res) => {
        db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [res.role_id, res.employeeId])
    })
        .then(() => {
            init();
        })
};

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'View all departments'
                },
                {
                    name: 'View all roles',
                    value: 'View all roles'
                },
                {
                    name: 'View all employees',
                    value: 'View all employees'
                },
                {
                    name: 'Add a department',
                    value: 'Add a department'
                },
                {
                    name: 'Add a role',
                    value: 'Add a role'
                },
                {
                    name: 'Add an employee',
                    value: 'Add an employee'
                },
                {
                    name: 'Update an employee role',
                    value: 'Update an employee role'
                },
                {
                    name: 'Quit',
                    value: 'Quit'
                },
            ]
        }
    ]).then((res) => {
        switch (res.choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    })
};



init();