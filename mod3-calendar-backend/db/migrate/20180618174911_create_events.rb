class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.time :time
      t.belongs_to :user, foreign_key: true
      t.belongs_to :tag, foreign_key: true
      t.belongs_to :day, foreign_key: true

      t.timestamps
    end
  end
end
