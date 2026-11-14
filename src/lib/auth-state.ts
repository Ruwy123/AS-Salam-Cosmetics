export type AuthActionState = {
  status: "error" | "success" | null;
  message: string;
  email?: string;
};

export const initialAuthActionState: AuthActionState = {
  status: null,
  message: "",
};
