// @desc    Get Goals
//@ route   GET /api/goals
const getGoals = (req, res) => {
    res.status(200).json({ message: "Get Goals" });
};

// @desc    Set Goals
//@ route   POST /api/goals
const setGoal = (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text");
    }
    console.log(req.body);
    res.status(200).json({ message: "Create/set Goal" });
};

// @desc    Update Goals
//@ route   PUT /api/goals/:id
const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update Goals ${req.params.id}` });
};

// @desc    Delete Goals
//@ route   DELETE /api/goals/:id
const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete Goals ${req.params.id}` });
};

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
