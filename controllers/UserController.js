const { User } = require('../models')

class UserController {
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body)
      return res.status(201).json({
        user
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll()
      return res.status(200).json({ users })
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  // Get a user by id
  async getUserById(req, res) {
    try {
      const { id } = req.params
      const user = await User.findOne({
        where: { id: id }
      })
      if (user) {
        return res.status(200).json({ user })
      }
      return res.status(404).send('User with the specified ID does not exists')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  // Update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const [updated] = await User.update(req.body, {
        where: { id: id }
      })
      if (updated) {
        const updatedUser = await User.findOne({ where: { id: id } })
        return res.status(200).json({ user: updatedUser })
      }
      throw new Error('User not found')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  // Delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const deleted = await User.destroy({
        where: { id: id }
      })
      if (deleted) {
        return res.status(204).send('User deleted')
      }
      throw new Error('User not found')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}

module.exports = new UserController()
