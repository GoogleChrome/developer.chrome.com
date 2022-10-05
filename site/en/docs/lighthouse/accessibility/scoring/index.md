---
layout: 'layouts/doc-post.njk'
title: "Lighthouse accessibility scoring"
description: |
  Learn how Lighthouse generates the accessibility score for your page.
date: 2019-09-19
updated: 2022-09-19
---

The Lighthouse Accessibility score is a weighted average
of all accessibility audits.
Weighting is based on
[axe user impact assessments](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).

Each accessibility audit is pass or fail.
Unlike the [Performance audits](/docs/lighthouse/performance/),
a page doesn't get points for partially passing an accessibility audit.
For example, if some buttons on a page have accessible names,
but others don't, the page gets a 0 for the
[**Buttons do not have an accessible name** audit](https://dequeuniversity.com/rules/axe/4.4/button-name).

The following table shows the weighting for each accessibility audit.
More heavily weighted audits have a bigger effect on your score.
[Manual audits](/docs/lighthouse/accessibility/#additional-items-to-manually-check)
aren't included in the table because they don't affect your score.

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Audit</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/accesskeys"><code>[accesskey]</code> values are unique</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr"><code>[aria-*]</code> attributes match their roles</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-command-name"><code>button</code>, <code>link</code>, and <code>menuitem</code> elements have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-hidden-body"><code>[aria-hidden="true"]</code> is not present on the document <code>&#60;body&#62;</code></a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-hidden-focus"><code>[aria-hidden="true"]</code> elements do not contain focusable descendents</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-input-field-name">ARIA input fields have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-meter-name">ARIA <code>meter</code> elements have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-progressbar-name">ARIA <code>progressbar</code> elements have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-required-attr"><code>[role]</code>s have all required <code>[aria-*]</code> attributes</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-required-children">Elements with an ARIA <code>[role]</code> that require children to contain a specific <code>[role]</code> have all required children.</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-required-parent"><code>[role]</code>s are contained by their required parent element</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-roles"><code>[role]</code> values are valid</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-toggle-field-name">ARIA toggle fields have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-tooltip-name">ARIA <code>tooltip</code> elements have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-treeitem-name">ARIA <code>treeitem</code> elements have accessible names</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value"><code>[aria-*]</code> attributes have valid values</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr"><code>[aria-*]</code> attributes are valid and not misspelled</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/button-name">Buttons have an accessible name</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/bypass">The page contains a heading, skip link, or landmark region</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/color-contrast">Background and foreground colors have a sufficient contrast ratio</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/definition-list"><code>&#60;dl&#62;</code>'s contain only properly-ordered <code>&#60;dt&#62;</code> and <code>&#60;dd&#62;</code> groups, <code>&#60;script&#62;</code>, <code>&#60;template&#62;</code> or <code>&#60;div&#62;</code> elements.</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/dlitem">Definition list items are wrapped in <code>&#60;dl&#62;</code> elements</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/document-title">Document has a <code>&#60;title&#62;</code> element</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/duplicate-id-active"><code>[id]</code> attributes on active, focusable elements are unique</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria">ARIA IDs are unique</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/form-field-multiple-labels">No form fields have multiple labels</a></td>
        <td>2</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/frame-title"><code>&#60;frame&#62;</code> or <code>&#60;iframe&#62;</code> elements have a title</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/heading-order">Heading elements appear in a sequentially-descending order</a></td>
        <td>2</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/html-has-lang"><code>&#60;html&#62;</code> element has a <code>[lang]</code> attribute</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/html-lang-valid"><code>&#60;html&#62;</code> element has a valid value for its <code>[lang]</code> attribute</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/image-alt">Image elements have <code>[alt]</code> attributes</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/input-image-alt"><code>&#60;input type="image"&#62;</code> elements have <code>[alt]</code> text</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/label">Form elements have associated labels</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/link-name">Links have a discernible name</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/list">Lists contain only <code>&#60;li&#62;</code> elements and script supporting elements (<code>&#60;script&#62;</code> and <code>&#60;template&#62;</code>).</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/listitem">List items (<code>&#60;li&#62;</code>) are contained within <code>&#60;ul&#62;</code>, <code>&#60;ol&#62;</code> or <code>&#60;menu&#62;</code> parent elements</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/meta-refresh">The document does not use <code>&#60;meta http-equiv="refresh"&#62;</code></a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/meta-viewport"><code>[user-scalable="no"]</code> is not used in the <code>&#60;meta name="viewport"&#62;</code> element and the <code>[maximum-scale]</code> attribute is not less than 5.</a></td>
        <td>10</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/object-alt"><code>&#60;object&#62;</code> elements have alternate text</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/tabindex">No element has a <code>[tabindex]</code> value greater than 0</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/td-headers-attr">Cells in a <code>&#60;table&#62;</code> element that use the <code>[headers]</code> attribute refer to table cells within the same table.</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/th-has-data-cells"><code>&#60;th&#62;</code> elements and elements with <code>[role="columnheader"/"rowheader"]</code> have data cells they describe.</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/valid-lang"><code>[lang]</code> attributes have a valid value</a></td>
        <td>3</td>
      </tr>
      <tr>
        <td><a href="https://dequeuniversity.com/rules/axe/4.4/video-caption"><code>&#60;video&#62;</code> elements contain a <code>&#60;track&#62;</code> element with <code>[kind="captions"]</code></a></td>
        <td>10</td>
      </tr>
    </tbody>
  </table>
</div>
