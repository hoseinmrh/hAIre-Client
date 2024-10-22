"use client";

export interface IEducation {
  degree: string;
  institution: string;
  from_to: string;
}

export const EducationCard = ({ degree, institution, from_to }: IEducation) => {
  return (
    <>
      <div className="bg-transparent opacity-80 text-left w-full rounded-2xl p-4 mb-8 shadow-sm shadow-orange-500">
        <h3 className="mb-4 text-justify">
          <span className="text-gray-400">Degree: </span>
          {degree}
        </h3>

        <h4 className="mb-4 text-justify">
          <span className="text-gray-400">University: </span>
          {institution}
        </h4>

        <p className="text-lg mb-3 text-justify">
          <span className="text-gray-400">From-To: </span>
          {from_to}
        </p>
      </div>
    </>
  );
};
