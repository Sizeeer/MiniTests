//Core
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

//Other
import trampImage from "../../assets/images/skeleton.png";
import { useLike } from "../../hooks/useLike";
import { useDeleteTest } from "../../hooks/useDeleteTest";
import { StartTestingModal } from "./StartTestingModal";
import { theme } from "../../theme";

const Test = ({ test, profileInfo, isMyTest, setTests }) => {
  const { title, owner, description, questions, allLikes, userId, result } =
    test;
  const { like } = useLike();
  const { deleteTest } = useDeleteTest();

  const [likes, setLikes] = useState(null);

  const [visible, setVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(
    !(profileInfo && userId.indexOf(profileInfo.id) === -1)
  );

  useEffect(() => {
    if (Number(allLikes)) {
      setLikes(allLikes);
    }
  }, [allLikes]);

  const changeLikes = (e) => {
    e.stopPropagation();
    try {
      like(title);
      setIsLiked((prev) => !prev);
      setLikes((prev) => {
        if (isLiked) {
          return prev - 1;
        }
        return prev + 1;
      });
    } catch (e) {}
  };

  const deleteTestHandler = (e) => {
    e.stopPropagation();
    try {
      deleteTest(title);
      setTests((prev) => prev.filter((el) => el.title !== title));
    } catch (e) {}
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <Card
        style={{
          flex: "0 0 21%",
          marginBottom: 30,
          justifyContent: "space-between",
          transition: "0.25s",
        }}
        onClick={showDrawer}
      >
        <Card.Img
          variant="top"
          src={trampImage}
          style={{ height: 270, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {title}
          </Card.Title>
          <Card.Text>{owner}</Card.Text>
          <div className="d-flex justify-content-between">
            <Button className="likeBtn" onClick={changeLikes}>
              <i
                className={
                  isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
                }
                style={{
                  color: theme.mainColor,
                  fontSize: 20,
                  marginRight: 3,
                }}
              ></i>
              {Number(likes)}
            </Button>
            {isMyTest && (
              <Button variant="primary" onClick={deleteTestHandler}>
                <i class="bi bi-trash"></i>
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <StartTestingModal
        show={visible}
        onHide={closeDrawer}
        description={description}
        title={title}
        questions={questions}
        result={result}
      />
    </>
  );
};

export default Test;
