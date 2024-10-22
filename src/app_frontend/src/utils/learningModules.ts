import module1 from "../assets/module1.jpg";
import module2 from "../assets/module2.jpg";
import module3 from "../assets/module3.png";
import admin from "../assets/sns-image.webp";
import module4 from "../assets/onb4.jpeg";

export type TLearningModule = {
  id: number;
  owner: string;
  title: string;
  slides: number;
  completed: number;
  enrolled: number;
  image: string;
  ownerImage: string;
  price: string;
  points: number;
};

const learningModules: TLearningModule[] = [
  {
    id: 1,
    owner: "admin",
    title: "What is Blockchain?",
    slides: 24,
    completed: 0,
    enrolled: 0,
    image: module1,
    ownerImage: admin,
    price: "Free",
    points: 1250,
  },
  {
    id: 2,
    owner: "admin",
    title: "How ChamaDAO works",
    slides: 16,
    completed: 0,
    enrolled: 0,
    image: module2,
    ownerImage: admin,
    price: "Free",
    points: 500,
  },
  {
    id: 3,
    owner: "admin",
    title: "How to use ChamaDAO",
    slides: 7,
    completed: 0,
    enrolled: 0,
    image: module3,
    ownerImage: admin,
    price: "Free",
    points: 350,
  },
  {
    id: 4,
    owner: "admin",
    title: "Introduction to DeFi",
    slides: 4,
    completed: 0,
    enrolled: 0,
    image: module4,
    ownerImage: admin,
    price: "Free",
    points: 150,
  },
];

export default learningModules;
