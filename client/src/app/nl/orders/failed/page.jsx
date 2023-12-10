function page({ params }) {
  const userId = params.id;
  return <div>{userId}</div>;
}

export default page;
