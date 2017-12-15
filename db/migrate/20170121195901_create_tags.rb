# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :name
    end

    add_index :tags, :name
  end
end
