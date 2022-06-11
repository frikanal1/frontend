export type BulletinData = {
  id: number

  title: string
  text: string

  createdAt: Date
  updatedAt: Date
}

export type NewBulletinForm = {
  title: string
  text: string
}
