import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: '정지부실 현장점검',
    description: '정지부실 현장점검 내용을 등록하세요.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
