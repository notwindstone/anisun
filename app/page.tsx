import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
    return (
        <>
            <Welcome />
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <ColorSchemeToggle />
        </>
    );
}
