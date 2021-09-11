import emptyList from "../../assets/images/emptyList.png";

export const NotTests = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column w-100"
      style={{
        height: 350,
      }}
    >
      <img src={emptyList} alt="empty" style={{ marginBottom: 15 }} />
      <h2 className="font-weight-bold">Список тестов пуст!</h2>
    </div>
  );
};
