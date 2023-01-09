USE employeeDB;

-- departments

INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Software Engineering");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Sales");

-- insert roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Recruiter", 150000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 200000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Associate Software Engineer", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Outside Sales Specialist", 125000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 175000, 4);

-- insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Jordan", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("M", "J", 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ken", "Griffey", 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lionel", "Messi", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Judd", "Fulbreezy", 3, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Saint", "Nick", 12, 25);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("This", "Guy", 0, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amazing", "Grace", 1, 2);