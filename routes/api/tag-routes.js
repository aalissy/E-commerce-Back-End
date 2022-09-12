const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  }).then((data) => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  }).then((data) => {
    if(!data) {
      res.status(404).json({message: "I'm sorry! I couldn't find a tag with this id! Please try again with a different id"});
      return;
    }
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((data) => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if(!data) {
      res.status(404).json({message: "I'm sorry! I couldn't find a tag with this id! Please try again with a different id"});
      return;
    }
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if(!data) {
      res.status(404).json({message: "I'm sorry! I couldn't find a tag with this id! Please try again with a different id"});
      return;
    }
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;