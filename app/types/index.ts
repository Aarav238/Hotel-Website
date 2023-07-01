import { Listings, User } from "@prisma/client";
export type safeListing = Omit<
Listings,
"createdAt"
> & {
  createdAt : string;
}
export type SafeUser = Omit<
  User,
  "createAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
