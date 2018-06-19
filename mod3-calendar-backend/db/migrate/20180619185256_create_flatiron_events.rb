class CreateFlatironEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :flatiron_events do |t|
      t.string :title
      t.text :description
      t.datetime :time
      t.string :location

      t.timestamps
    end
  end
end
