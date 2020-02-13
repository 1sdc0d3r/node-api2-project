const express = require("express");
const router = express.Router();
const db = require("../data/db");

// Create.Read.Update.Destroy

router.post("/", (req, res) => {
  const newPost = req.body;
  !req.body.title || !req.body.contents
    ? res.status(400).send({
        errorMessage: "Please provide title and contents for the post."
      })
    : db
        .insert(newPost)
        .then(post => res.status(201).send(post))
        .catch(err => {
          console.log(err);
          res.status(500).send({
            error: "There was an error while saving the post to the database"
          });
        });
});

router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  !comment.text
    ? res
        .status(400)
        .send({ errorMessage: "Please provide text for the comment." })
    : db
        .insertComment(comment)
        .then(
          !newComment
            ? res.status(500).send({
                error:
                  "There was a error while saving the comment to the database",
                err
              })
            : newComment => res.status(201).send(newComment)
        )
        .catch(err =>
          res.status(404).send({
            message: "The post with the specified ID does not exist"
          })
        );
});

router.get("/", (req, res) => {
  db.find()
    .then(posts => res.status(200).send(posts))
    .catch(() =>
      res
        .status(500)
        .send({ error: "The posts information could not be retrieved" })
    );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET");
  db.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      } else {
        post => res.status(200).send(post);
      }
    })
    .catch(() =>
      res
        .status(500)
        .send({ error: "The post information could not be retrieved." })
    );
});

router.get("/:id/comments", (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments =>
      comments.length === 0
        ? res
            .status(404)
            .send({ message: "The post with the specified ID does not exist." })
        : res.status(200).send(comments)
    )
    .catch(() =>
      res
        .status(500)
        .send({ error: "The comments information could not be retrieved." })
    );
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).send({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    const updated = db
      .findById(req.params.id)
      .then(post => post[0])
      .catch(err => console.log(err));
    db.update(req.params.id, req.body)
      .then(post => {
        !post
          ? res.status(404).send({
              message: "The post with the specified ID does not exist."
            })
          : res.status(200).send(updated);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ error: "The post information could not be modified." });
      });
  }
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(response =>
      !response
        ? res.status(404).send({ message: "The post could not be removed" })
        : res.status(204)
    )
    .catch(err =>
      res.status(500).send({ error: "The post could not be removed" })
    );
});

module.exports = router;
