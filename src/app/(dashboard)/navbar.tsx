import { UserButton } from '@/features/auth/components/user-button';

export const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-editor-navbar">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};
