# frozen_string_literal: true

# Generates tag files automatically.
# Adapted from https://www.untangled.dev/2020/06/02/tag-management-jekyll/
# and customized to fit this theme.
#
# Tag files are named with the tag's slug (e.g. `open-source.md` for the
# tag "open source") so URLs stay clean and the slug lookup in
# `_includes/components/tag-list.html` keeps working.

Jekyll::Hooks.register :posts, :post_write do |post|
  all_existing_tags = Dir.children("_featured_tags")
    .select { |f| File.extname(f) == ".md" }
    .map { |f| File.basename(f, ".md") }

  post["tags"].reject { |t| t.empty? }.each do |tag|
    slug = Jekyll::Utils.slugify(tag)
    generate_tag_file(tag, slug) unless all_existing_tags.include?(slug)
  end
end

def generate_tag_file(tag, slug)
  title = tag.split(/[-_\s]+/).map(&:capitalize).join(" ")
  File.open("_featured_tags/#{slug}.md", "wb") do |file|
    file << "---\nlayout: tag-list\ntitle: #{title}\nmenu: false\ndescription: >\n  Posts about #{title.downcase}\n---"
  end
end
