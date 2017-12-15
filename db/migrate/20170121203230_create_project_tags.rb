# frozen_string_literal: true

class CreateProjectTags < ActiveRecord::Migration[5.0]
  def change
    create_table :project_tags do |t|
      t.integer :project_id
      t.integer :tag_id
    end

    add_index :project_tags, :project_id
    add_index :project_tags, :tag_id
  end
end
