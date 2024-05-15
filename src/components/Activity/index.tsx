import Table from '../Table';
import './activity.scss';

export default function Activity() {

    async function TestAPI() {
        'use server'
        let res = await fetch('/api/sui/getBalance');

        if (!res.ok) console.log(res.status, res.statusText)
        res = await res.json();
        console.log(res)
    }

    return (
        <div
            className='
                rounded-md border-white border-[1px] bg-[#0A0A0A]
                w-[75%] mt-12'
        >
            <Table
                cols={[
                    { name: 'Title', },
                    { name: 'Year', },
                ]}
                data={[
                    {
                    id: 1,
                    title: 'Beetlejuice',
                    year: '1988',
                },
                {
                    id: 2,
                    title: 'Ghostbusters',
                    year: '1984',
                },
            ]}
            />
        </div>
    )
}