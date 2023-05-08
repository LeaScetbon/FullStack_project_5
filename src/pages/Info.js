function Info() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <section className="section">
      <h4>Hello, {user.name}</h4>
    </section>
  );
}

export default Info;
