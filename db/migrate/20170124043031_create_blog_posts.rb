# frozen_string_literal: true

class CreateBlogPosts < ActiveRecord::Migration[5.0]
  def change
    create_table :blog_posts do |t|
      t.string :title
      t.text :desc
      t.text :content

      t.timestamps
    end

    add_index :blog_posts, :title
  end
end
