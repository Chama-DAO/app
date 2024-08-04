export const notifications = [
  {
    id: 1,
    title: "Welcome to the community",
    type: "system",
    description: "You have successfully joined the ChamaDAO community.",
    read: false,
    time: new Date(Date.now()).toLocaleString(),
  },
  {
    id: 2,
    title: "Start your learning journey",
    type: "learn",
    description:
      "Explore the platform and start learning about ChamaDAO and blockchain.",
    read: false,
    time: new Date(Date.now()).toLocaleString(),
  },
  {
    id: 3,
    title: "Start creating chamas",
    type: "chama",
    description:
      "Create a chama and invite your friends to join. Or join an existing chama.",
    read: false,
    time: new Date(Date.now()).toLocaleString(),
  },
];
