exports.renderView = (req, res, view, title = 'DepX', data = undefined) => {
    res.render(view, {
        title: title,
        data: data
    });
};