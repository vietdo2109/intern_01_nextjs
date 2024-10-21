const adobeLogo = "/svgs/adobeLogo.svg";
const blueALogo = "/svgs/blueALogo.svg";
const slackLogo = "/svgs/slackLogo.svg";
const spotifyLogo = "/svgs/spotifyLogo.svg";
const jiraLogo = "/svgs/jiraLogo.svg";
const inLogo = "/svgs/inLogo.svg";

const author2 = "/images/authorTwo.png";
const author3 = "/images/authorThree.png";
const author4 = "/images/authorFive.png";
const author5 = "/images/authorFive.png";
const author6 = "/images/authorSix.png";

export interface Project {
  iconSVG: string;
  projectName: string;
  budget: number;
  member: string[];
  completionRate: number;
}

export const projectList: Project[] = [
  {
    iconSVG: adobeLogo,
    projectName: "Chakra Soft UI Version",
    budget: 14000,
    member: [author2, author3, author4, author5, author6],
    completionRate: 60,
  },
  {
    iconSVG: blueALogo,
    projectName: "Add Progress Track",
    budget: 3000,
    member: [author2, author3],
    completionRate: 10,
  },
  {
    iconSVG: slackLogo,
    projectName: "Fix Platform Errors",
    budget: 0,
    member: [author2, author3, author4],
    completionRate: 100,
  },
  {
    iconSVG: spotifyLogo,
    projectName: "Launch our Mobile App",
    budget: 32000,
    member: [author2, author3, author4, author5],
    completionRate: 100,
  },
  {
    iconSVG: jiraLogo,
    projectName: "Add the New Pricing Page",
    budget: 400,
    member: [author2, author3, author4, author5, author6],
    completionRate: 25,
  },
  {
    iconSVG: inLogo,
    projectName: "Redesign New Online Shop",
    budget: 7600,
    member: [author2, author3, author6],
    completionRate: 40,
  },
];
