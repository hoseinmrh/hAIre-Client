"use client";

export interface IWorkExperience {
  position: string;
  company: string;
  from_to: string;
  description: string;
}

export const WorkExperience = ({
  position,
  company,
  from_to,
  description,
}: IWorkExperience) => {
  return (
    <>
      <div className="bg-transparent opacity-80 text-left w-full rounded-2xl p-4 mb-8 shadow-sm shadow-orange-500 text-xl">
        <p className="mb-4 text-justify">
          <span className="text-gray-400">Job Position: </span>
          {position}
        </p>

        <p className="mb-4 text-justify">
          <span className="text-gray-400">Company: </span>
          {company}
        </p>

        <p className="text-lg mb-3 text-justify">
          <span className="text-gray-400">From-To: </span>
          {from_to}
        </p>
        <p className="text-lg mb-3 text-justify">
          <span className="text-gray-400">Description: </span>
          {description}
        </p>
      </div>
    </>
  );
};
