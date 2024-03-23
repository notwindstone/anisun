import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    return <p>Post: {router.query.slug}</p>;
}
