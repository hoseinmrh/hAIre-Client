"use client";

import { TypeAnimation } from "react-type-animation";
import { WorkExperience } from "@/components/workExperienceCard";
import { EducationCard } from "@/components/educationCard";

export interface IWorkExperience {
  position: string | "";
  company: string | "";
  from_to: string | "";
  description: string | "";
}

export interface IEducation {
  degree: string | "";
  institution: string | "";
  from_to: string | "";
}

export interface ICVData {
  name: string | "";
  email: string | "";
  work_experiences: IWorkExperience[] | [];
  educations: IEducation[] | [];
}

export const CVData = ({
  name,
  email,
  work_experiences,
  educations,
}: ICVData) => {
  return (
    <>
      <TypeAnimation
        sequence={[`Welcome ${name}`, 3000, "Here is your CV Data!", 3000]}
        wrapper="span"
        speed={60}
        style={{ display: "inline-block" }}
        repeat={Infinity}
        className="text-center text-4xl"
        cursor={false}
      />

      <div className="flex justify-start w-full mt-12 flex-col">
        <div className="text-2xl text-white">
          💻 Your email address:{" "}
          <span className="text-orange-500 text-xl">{email}</span>
        </div>

        <div className="text-2xl text-white mt-16 mb-4">
          👑 Work Experiences:
        </div>
        {work_experiences.map((work_experiences, index) => (
          <WorkExperience
            key={index}
            position={work_experiences.position}
            company={work_experiences.company}
            from_to={work_experiences.from_to}
            description={work_experiences.description}
          />
        ))}

        <div className="text-2xl text-white mt-16 mb-4">👨‍🎓 Educations:</div>
        {educations.map((ed, index) => (
          <EducationCard key={index} {...ed} />
        ))}
      </div>
    </>
  );
};
