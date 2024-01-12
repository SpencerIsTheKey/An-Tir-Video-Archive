'use client'

export default function browse() {
  return (
    <>
    </>
  )
}

export async function getStaticProps() {
    const res = await fetch(process.env.API_URL + '/events/all');
    const events = await res.json();

    return {
      props: {
        events,
      },
    };
}