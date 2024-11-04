class Student {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }
}

class Teacher {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    editCourse(course, level) {
        const courseIndex = this.courses.findIndex(c => c.course === course);
        if (courseIndex !== -1) {
            this.courses[courseIndex].level = level;
        }
    }
}

// Clase ExtendedUser 
class ExtendedUser {
    static match(teacher, student, courseName = null) {
        // Si se pasa un nombre de curso, buscamos una coincidencia específica
        if (courseName) {
            const teacherCourse = teacher.courses.find(c => c.course === courseName);
            const studentCourse = student.courses.find(c => c.course === courseName);

            if (teacherCourse && studentCourse && teacherCourse.level >= studentCourse.level) {
                return { course: courseName, level: studentCourse.level };
            }
            return undefined;
        } else {
            // Si no se pasa un nombre de curso, buscamos todas las coincidencias
            const matches = student.courses
                .filter(studentCourse => {
                    const teacherCourse = teacher.courses.find(
                        tCourse => tCourse.course === studentCourse.course && tCourse.level >= studentCourse.level
                    );
                    return teacherCourse !== undefined;
                })
                .map(studentCourse => ({
                    course: studentCourse.course,
                    level: studentCourse.level
                }));

            return matches.length > 0 ? matches : [];
        }
    }
}

let student1 = new Student({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com' });
let student2 = new Student({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com' });
let teacher1 = new Teacher({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com' });

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);

let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]

teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []

teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}
