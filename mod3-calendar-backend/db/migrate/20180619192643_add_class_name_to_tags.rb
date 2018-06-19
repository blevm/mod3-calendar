class AddClassNameToTags < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :class_name, :string
  end
end
