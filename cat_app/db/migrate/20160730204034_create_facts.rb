class CreateFacts < ActiveRecord::Migration[5.0]
  def change
    create_table :facts do |t|
      t.string :info
      t.string :user

      t.timestamps
    end
  end
end
