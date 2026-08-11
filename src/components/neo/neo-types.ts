export type NeoView = "minimized" | "greeting" | "open";

export type Msg = {
  id: string;
  from: "you" | "neo";
  text: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: "blue" | "teal" | "amber";
  actionText: string;
};
