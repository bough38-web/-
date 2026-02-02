import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';
import { decrypt } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // --- Config Validation ---
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!sbUrl || !sbUrl.startsWith('https://')) {
            return NextResponse.json({ error: `설정 오류: Supabase URL이 올바르지 않습니다. (현재값: ${sbUrl?.substring(0, 8)}...)` }, { status: 500 });
        }
        if (!sbKey || !sbKey.startsWith('ey')) {
            return NextResponse.json({ error: `설정 오류: Service Role Key가 올바르지 않습니다. (현재값: ${sbKey?.substring(0, 5)}...)` }, { status: 500 });
        }
        // -------------------------

        const { data, error } = await adminSupabase
            .from('inspections')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Decrypt business_name for display
        const decryptedData = data?.map(item => ({
            ...item,
            business_name: decrypt(item.business_name)
        }));

        return NextResponse.json(decryptedData || []);

    } catch (e) {
        return NextResponse.json([], { status: 500 });
    }
}
