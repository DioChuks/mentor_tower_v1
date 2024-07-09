export enum UserRole {
    Mentee = "MENTEE",
    Mentor = "MENTOR",
    Admin = "ADMIN"
}

const allRoles = {
    user: [],
    mentor: ['getMentees', 'manageMentees'],
    admin: ['getMentees', 'manageMentees', 'getMentors', 'manageMentors'],
  };
  
  export const roles: string[] = Object.keys(allRoles);
  export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
  