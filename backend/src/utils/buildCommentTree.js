const buildCommentTree = (comments) => {
  const commentMap = {};
  const tree = [];

  // Initialize map
  comments.forEach((comment) => {
    commentMap[comment._id] = {
      ...comment._doc,
      replies: []
    };
  });

  // Build tree
  comments.forEach((comment) => {
    if (comment.parentComment) {
      commentMap[comment.parentComment]?.replies.push(
        commentMap[comment._id]
      );
    } else {
      tree.push(commentMap[comment._id]);
    }
  });

  return tree;
};

module.exports = buildCommentTree;
