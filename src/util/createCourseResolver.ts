import DataLoader from "dataloader";
import { Course } from "../entities/Course";

// [1, 78, 8, 9]
// [{id: 1, Coursename: 'tim'}, {}, {}, {}]
export const createCourseLoader = () =>
  new DataLoader<number, Course>(async (CourseIds) => {
    const Courses = await Course.findByIds(CourseIds as number[]);
    const CourseIdToCourse: Record<number, Course> = {};
    Courses.forEach((c) => {
      CourseIdToCourse[c.id] = c;
    });

    const sortedCourses = CourseIds.map((CourseId) => CourseIdToCourse[CourseId]);
    // console.log("CourseIds", CourseIds);
    // console.log("map", CourseIdToCourse);
    // console.log("sortedCourses", sortedCourses);
    return sortedCourses;
  });