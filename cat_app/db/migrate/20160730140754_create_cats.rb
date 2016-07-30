class CreateCats < ActiveRecord::Migration[5.0]
  def change
    create_table :cats do |t|
      t.string :fact
      t.string :image

      t.timestamps
    end
  end
end
