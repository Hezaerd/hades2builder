import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ user }: { user: User }) {
  const name =
    user.fullName || user.firstName || user.emailAddresses[0].emailAddress;

  return (
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
