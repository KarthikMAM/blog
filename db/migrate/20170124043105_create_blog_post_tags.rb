class CreateBlogPostTags < ActiveRecord::Migration[5.0]
  def change
    create_table :blog_post_tags do |t|
      t.integer :blog_post_id
      t.integer :tag_id
    end

    add_index :blog_post_tags, :blog_post_id
    add_index :blog_post_tags, :tag_id
  end
end
