class Ctrl extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async run() {
    // вместо селекта с отельным полем просто берем уникальные значения юезров из заказов
    // таким образом нам не надо будет в цикле отдельно вычленять айди юзеров
    const userIds = await Order.Model.distinct("user_id");

    // вместо запросов в цикле достаем всех пользователей по массиву их id
    const criteria = { _id: { $in: userIds} };
    const users = await User.Model.findOne(criteria);

    // нам просто надо отфильтровать количество юзеров с флагом
    // плюс for .. of вроде медленнее, насколько я помню
    const problemUsers = users.filter(user => user.problem === false)

    // как я понял, все выбранные пользователи отмечаются флагом
    // вместо избыточных запросов в цикле апдейтим по айдишникам, вычисленным выше
    await User.Model.updateMany(criteria, { problem: true });

    // здесь просто вернем количество отфильтрованных юзеров
    return { count: problemUsers.length };
  }
}
