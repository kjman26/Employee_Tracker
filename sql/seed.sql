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