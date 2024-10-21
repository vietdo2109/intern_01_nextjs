const icon1 = "/svgs/adobeLogo.svg";
const icon2 = "/svgs/blueALogo.svg";
const icon3 = "/svgs/slackLogo.svg";
const icon4 = "/svgs/spotifyLogo.svg";
const icon5 = "/svgs/jiraLogo.svg";

export type Project = {
  iconSVG: string;
  projectName: string;
  budget: number;
  status: "Working" | "Canceled" | "Done";
  completionRate: number;
};

export const projectList: Project[] = [
  {
    iconSVG: icon1,
    projectName: "Chakra Soft UI Version",
    budget: 14000,
    status: "Working",
    completionRate: 60,
  },
  {
    iconSVG: icon2,
    projectName: "Add Progress Track",
    budget: 3000,
    status: "Canceled",
    completionRate: 10,
  },
  {
    iconSVG: icon3,
    projectName: "Fix Platform Errors",
    budget: 0,
    status: "Done",
    completionRate: 100,
  },
  {
    iconSVG: icon4,
    projectName: "Launch our Mobile App",
    budget: 32000,
    status: "Done",
    completionRate: 100,
  },
  {
    iconSVG: icon5,
    projectName: "Add the New Pricing Page",
    budget: 400,
    status: "Working",
    completionRate: 25,
  },
];
